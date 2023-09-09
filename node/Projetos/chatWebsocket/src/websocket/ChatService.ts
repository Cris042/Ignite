import { container } from 'tsyringe';
import { io } from '../http';
import { CreateChatRoomService } from '../services/CreateChatRoomService';
import { CreateUserService } from '../services/CreateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';
import { GetUserBySocketIdService } from '../services/GetUserBySocketIdService';
import { GetChatRoomByUsersService } from '../services/GetChatRoomByUsersService';
import { CreateMessageService } from '../services/CreateMessageService';
import { GetMessageByChatRoomService } from '../services/GetMessageByChatRoomService';
import { GetChatRoomByIdService } from '../services/GetChatRoomByIdService';


io.on('connect', (socket) => {

  socket.on('start', async(data) => {
    const { email, name, avatar } = data;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      avatar,
      name,
      socket_id: socket.id,
    });

    //Broadcast - envia a mensagem para todos os sockets, menos ele mesmo 
    socket.broadcast.emit('new_users', user);
  });

  socket.on('get_users', async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);
    const users = await getAllUsersService.execute();

    callback(users);
  });

  socket.on('start_chat', async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
    const getChatRoomByUsersServices = container.resolve(GetChatRoomByUsersService);
    const getMessageByChatRoomService = container.resolve(GetMessageByChatRoomService);

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    let room = await getChatRoomByUsersServices.execute([
      data.idUser,
      userLogged._id
    ]);

    if(!room) {
      room = await createChatRoomService.execute([data.idUser, userLogged._id]);
    }

    socket.join(room.idChatRoom);

    // buscar mensagens da sala
    const messages = await getMessageByChatRoomService.execute(room.idChatRoom);
    
    callback({room, messages});
  });

  socket.on('message', async (data) => {
    // buscar as informações do usuários
    const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
    const user = await getUserBySocketIdService.execute(socket.id);
    
    const getChatRoomByIdService = container.resolve(GetChatRoomByIdService);


    // salvar a mensagem
    const createMessageService = container.resolve(CreateMessageService);
    const message = await createMessageService.execute({
      to: user._id,
      text: data.message,
      roomId: data.idChatRoom
    });

    // enviar a mensagem para outros usuários da sala
    io.to(data.idChatRoom).emit('message', {
      message,
      user
    });


    // Enviar notificação para o usuário correto
    const room = await getChatRoomByIdService.execute(data.idChatRoom);
    const userFrom = room.idUsers.find(response => String(response._id) !== String(user._id));
    io.to(userFrom.socket_id).emit('notification', {
      newMessage: true,
      roomId: data.idChatRoom,
      from: user,
    })
  });

});
import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
;
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
         <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
         <NavLink icon={RiContactsLine} href="/users">Meus Dados</NavLink>
      </NavSection>
      <NavSection title="Projetos">
          <NavLink icon={RiContactsLine} href="/users">Meus Projetos</NavLink>
      </NavSection>
    </Stack>
  );
}
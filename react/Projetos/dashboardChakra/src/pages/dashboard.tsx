import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2023-03-18T00:00:00.000Z',
      '2023-03-19T00:00:00.000Z',
      '2023-03-20T00:00:00.000Z',
      '2023-03-21T00:00:00.000Z',
      '2023-03-22T00:00:00.000Z',
      '2023-03-23T00:00:00.000Z',
      '2023-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const options1 = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2023-01-01T00:00:00.000Z',
      '2023-02-01T00:00:00.000Z',
      '2023-03-01T00:00:00.000Z',
      '2023-04-01T00:00:00.000Z',
      '2023-05-01T00:00:00.000Z',
      '2023-06-01T00:00:00.000Z',
      '2023-07-01T00:00:00.000Z',
      '2023-08-01T00:00:00.000Z',
      '2023-09-01T00:00:00.000Z',
      '2023-10-01T00:00:00.000Z',
      '2023-11-01T00:00:00.000Z',
      '2023-12-01T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
]

const series1 = [
  { name: 'series2', data: [31, 120, 10, 28, 61, 18, 109, 123, 134, 345, 675, 113] }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Visitas No Projeto Mensal</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Visitas No Projeto Atual</Text>
            <Chart options={options1} series={series1} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
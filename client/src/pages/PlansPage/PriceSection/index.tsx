import React from 'react';
import {
  Container,
  Box,
  useMantineTheme,
  Title,
  Stack,
  Text,
  SimpleGrid,
  Card,
  List,
} from '@mantine/core';
import { FaCheck } from 'react-icons/fa';
import PriceCard from '../../../components/PriceCard';

function PriceSection() {
  const theme = useMantineTheme();
  return (
    <>
      <Box
        id='views'
        sx={{
          background: theme.fn.linearGradient(
            180,
            theme.colors.blue[0],
            '#fff'
          ),
        }}
      >
        <Container size='lg' pt={80}>
          <Stack align='center'>
            <Title order={1} weight={500} align='center'>
              Agile Tasker, tailored to you.
            </Title>
            <Text align='center' size='lg' maw={800}>
              Trusted by millions worldwide, Agile Tasker empowers teams across
              the globe. Explore the options to find the perfect fit for you.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size='lg' py={80}>
        <SimpleGrid
          cols={4}
          sx={{
            height: '100%',
            gap: 0,
            [theme.fn.smallerThan('sm')]: {
              gap: 20,
            },
          }}
          breakpoints={[
            { maxWidth: theme.breakpoints.sm, cols: 1, spacing: 'sm' },
          ]}
        >
          <Stack spacing={0}>
            <PriceCard
              tier={'Free'}
              amount={0}
              amountDescription={'Free for your entire team.'}
              tierDescription={
                'For individuals or teams looking to organize any project.'
              }
              buttonText={'Try for free'}
            />
            <Card
              withBorder
              radius={0}
              sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 450,
                [theme.fn.smallerThan('sm')]: {
                  minHeight: 'auto',
                },
              }}
            >
              <Text transform='uppercase' mb={10} size='sm' weight={600}>
                Included in free:
              </Text>
              <List
                spacing='xs'
                size='sm'
                center
                icon={<FaCheck size='1rem' color={theme.colors.green[6]} />}
              >
                <List.Item>Unlimited cards</List.Item>
                <List.Item>Up to 10 boards per Workspace</List.Item>
                <List.Item>Unlimited Power-Ups per board</List.Item>
                <List.Item>Unlimited storage (10MB/file)</List.Item>
                <List.Item>250 Workspace command runs per month</List.Item>
                <List.Item>Custom backgrounds & stickers</List.Item>
                <List.Item>Unlimited activity log</List.Item>
                <List.Item>Assignee and due dates</List.Item>
                <List.Item>iOS and Android mobile apps</List.Item>
                <List.Item>2-factor authentication</List.Item>
              </List>
            </Card>
          </Stack>

          <Stack spacing={0}>
            <PriceCard
              tier={'Standard'}
              amount={10}
              amountDescription={
                'Per user per month when billed annually ($12 when billed monthly).'
              }
              tierDescription={
                'For small teams seeking to manage tasks and expand collaboration.'
              }
              buttonText={'Sign up now'}
            />
            <Card
              withBorder
              padding='lg'
              radius={0}
              sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 450,
                [theme.fn.smallerThan('sm')]: {
                  minHeight: 'auto',
                },
              }}
            >
              <Text transform='uppercase' mb={10} size='sm' weight={600}>
                Everything in free, plus:
              </Text>
              <List
                spacing='xs'
                size='sm'
                center
                icon={<FaCheck size='1rem' color={theme.colors.green[6]} />}
              >
                <List.Item>Unlimited boards</List.Item>
                <List.Item>Advanced checklists</List.Item>
                <List.Item>Custom Fields</List.Item>
                <List.Item>Unlimited storage (250MB/file)</List.Item>
                <List.Item>1,000 Workspace command runs per month</List.Item>
                <List.Item>Single board guests</List.Item>
                <List.Item>Saved searches</List.Item>
              </List>
            </Card>
          </Stack>

          <Stack spacing={0}>
            <PriceCard
              tier={'Premium'}
              amount={20}
              amountDescription={
                'Per user per month when billed annually ($24 when billed monthly).'
              }
              tierDescription={
                'For teams requiring comprehensive project tracking and visualization across various formats like boards, timelines, calendars, and more.'
              }
              buttonText={'Get started now'}
              highlight={true}
            />
            <Card
              padding='lg'
              radius={0}
              sx={{
                border: `0.125rem solid ${theme.colors.pink[3]}`,
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 450,
                [theme.fn.smallerThan('sm')]: {
                  minHeight: 'auto',
                },
              }}
            >
              <Text transform='uppercase' mb={10} size='sm' weight={600}>
                Everything in standard, plus:
              </Text>
              <List
                spacing='xs'
                size='sm'
                center
                icon={<FaCheck size='1rem' color={theme.colors.green[6]} />}
              >
                <List.Item>
                  Views: Calendar, Timeline, Table, Dashboard, and Map
                </List.Item>
                <List.Item>Workspace views: Table and Calendar</List.Item>
                <List.Item>Unlimited Workspace command runs</List.Item>
                <List.Item>Atlassian Intelligence (AI)</List.Item>
                <List.Item>Admin and security features</List.Item>
                <List.Item>Workspace-level templates</List.Item>
                <List.Item>Collections</List.Item>
                <List.Item>Observers</List.Item>
                <List.Item>Simple data export</List.Item>
              </List>
            </Card>
          </Stack>

          <Stack spacing={0}>
            <PriceCard
              tier={'Enterprise'}
              amount={30}
              amountDescription={
                'Per user per month when billed annually ($39 when billed monthly).'
              }
              tierDescription={
                'For organizations necessitating secure and controlled connectivity of work across multiple teams.'
              }
              buttonText={'Contact sales'}
            />
            <Card
              withBorder
              padding='lg'
              radius={0}
              sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 450,
                [theme.fn.smallerThan('sm')]: {
                  minHeight: 'auto',
                },
              }}
            >
              <Text transform='uppercase' mb={10} size='sm' weight={600}>
                Everything in premium, plus:
              </Text>
              <List
                spacing='xs'
                size='sm'
                center
                icon={<FaCheck size='1rem' color={theme.colors.green[6]} />}
              >
                <List.Item>Unlimited Workspaces</List.Item>
                <List.Item>Organization-wide permissions</List.Item>
                <List.Item>Organization-visible boards</List.Item>
                <List.Item>Public board management</List.Item>
                <List.Item>Multi-board guests</List.Item>
                <List.Item>Attachment permissions</List.Item>
                <List.Item>Power-Up administration</List.Item>
                <List.Item>
                  Free SSO and user provisioning with Atlassian Access
                </List.Item>
              </List>
            </Card>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default PriceSection;

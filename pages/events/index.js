import Head from 'next/head'
import { useRouter } from 'next/router'

import { getAllEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

function AllEventsPage(props) {
  const router = useRouter()
  const { events } = props

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }
  if (events.length < 1) {
    return <p>Loading...</p>
  }
  return (
    <>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: {
      events: events,
    },
    revalidate: 60, // 1 minute
  }
}

export default AllEventsPage

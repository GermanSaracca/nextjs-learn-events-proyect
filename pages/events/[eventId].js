import Head from 'next/head'

import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

function EventDetailPage(props) {
  const selectedEvent = props.selectedEvent

  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </>
  )
}
export async function getStaticProps(context) {
  const { params } = context
  const eventId = params.eventId
  const event = await getEventById(eventId)

  if (!event) {
    return { notFound: true }
  }
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30, // Ya que un evento contiene una fecha, esta bueno que se revalide cada 30 segundos.
  }
}
export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents()

  //Crear una array de paths => [{params: {eventId: '1'}}, {params: {eventId: '2'}}]
  //Para que el sitio web pueda generar las rutas dinamicamente.
  //Vamos a pregenerar solo las rutas de los eventos importantes (featured events).
  //Esto implica que cambiemos el fallback: false  a true o 'blocking'.
  const paths = allEvents.map((event) => ({
    params: { eventId: event.id.toString() },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage

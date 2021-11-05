import Head from 'next/head'
import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '../components/events/event-list'

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Una descripcion de la pagina en particular"
        />
      </Head>
      <EventList events={props.events} />
    </div>
  )
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // 30 minutes - Cada 30 minutos regeneramos esta pagina para un nuevo request
  }
}

export default HomePage

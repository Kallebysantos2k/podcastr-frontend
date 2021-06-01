import axios from 'axios';
import React from 'react';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjI1MzY1MDcsImV4cCI6MTYyMjU0MDEwNywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoia2FsbGVieUBlbWFpbC5jb20ifQ.bucaY2SawXey3DQIZB-zzuWa8aIEJAV130FNwbMocEWHBUsXmosK-toHZfM27H_Rwrl0d-VstD-cdPB98QxNtMPexANrmkl5HCkBdwlRS8fSxBkmQ9UyJYbwZV8aaWlZBNz8SxxB1KHCxWIQEjve_rOjxRVj38YHubL9VD8COObm3SUk_HPtfAOi58OS8h0QGHlFf7lO_PyGL0-fFo5lNUJyQPO28Wm29fpjgAN6JwA2eazlJptbn7i49gBT37TFPb67GX5fquD_oD-joBGHjVBYaeFATRWkSNRZrmJhR9oPoqNadIJGwvhFzn9nPQra7Y6TqmCIsfZ3cYRhccKBfQ';

export default function Home(props) {
  console.log(props.episodes);
  const episodes = JSON.stringify(props.episodes);
  return (
    <div>
      <h1>Episodes🔥</h1>
      <p>{episodes}</p>
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:8000/podcast/', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.data;
  console.log(data);

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 2,
  };
}

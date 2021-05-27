import axios from 'axios';
import React, { useEffect } from 'react';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjIwMjMzMTEsImV4cCI6MTYyMjAyNjkxMSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQG1haWwuY29tIn0.VY5G4sgd6aR3YEn43z_Lbg4N0t0X1yhZMvzM8-MJK3hXWMpcEzu1eWNTdC13zoPX0E3eRstjMcRixOWfVxN7ZXRtBG7fDzv2mypxbG42SqiqA3PxsL63Ct5hmgCqprIoVE0wAB5GKj6i011WSTFHxcRRfqzmJBe_V1Sls5xCo_HEp5xKaGU9ePCOvSPqReLd90_xvafgJ19a-A0P-mrl-atj_Zh2M88xIUVLWbWs4W56UMXPaYLDnRAQ--dK6_EJ6PgguSCGA-kZtwkESz9c7YmSA1djgu-SsBLCkXA3-QkEcJx3PzyiESIs4_gLMLXuwm-otOHc1rmEyKcgVeT8ow';

export default function Home() {
  useEffect(() => {
    /*  axios.get('http://localhost:8000/podcast/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(console.log); */
  }, []);

  return (
    <div>
      <h1>Hello world 🔥</h1>
    </div>
  );
}

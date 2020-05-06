import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

const getPokemon = async (key, name) => {
  const { data } = await axios.get(`/api/pokemon?name=${escape(name)}`);
  return data;
};

export default () => {
  const router = useRouter();
  const { data } = useQuery(["name", router.query.name], getPokemon);
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

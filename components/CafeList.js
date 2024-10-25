import Dishes from "./dishes";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cafe from "@/components/Cafe";
import { AppContext } from "@/components/context";
import Search from "@/components/Search";

//import { AppContext } from "./context"
import { Container, Row } from "reactstrap";

import { useSession } from "next-auth/react";

function CafeList({ query }) {
  const [cafes, setCafes] = useState([]);
  const [cafeId, setCafeId] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ROOT}/api/cafes`, {
        query: searchTerm,
      })
      .then((res) => {
        setCafes(res.data.result);
      })
      .catch((error) => {
        console.log(`error in cafes: ${error}`);
        //setError(error.response.data);
        //setLoading(false);
      });
    console.log(`Query Data: ${JSON.stringify(cafes)}`);
  }, [searchTerm]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = cafes.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase()),
    );
    setCafes(results);
  };

  //definet renderer for Dishes
  const renderDishes = (cafeID, SearchTerm) => {
    if (!cafeID || cafeID.length === 0) {
      cafeID = 1;
    }
    console.log(`renderDishes: cafeID: ${cafeID} :: SearchTerm: ${SearchTerm}`);
    return <Dishes theCafeId={cafeID} dishQuery={SearchTerm} />;
  };

  //blue #3366ff
  //orange #f97520

  if (cafes.length > 0) {
    const cafeList = cafes.map((res) => (
      <Cafe key={res.id} res={res} setCafeId={setCafeId} />
    ));

    return (
      <>
        <Container style={{ paddingBottom: "30px" }}>
          <Row xs="3">
            <input
              type="text"
              className="form-control mr-sm-2"
              placeholder="Search our Cafes..."
              style={{ maxWidth: "600px" }}
              value={searchTerm}
              onChange={handleSearch}
            />
          </Row>
        </Container>
        <Container>
          <Row xs="3">{cafeList}</Row>

          <Row xs="3" style={{ padding: "10px" }}>
            {renderDishes(cafeId, searchTerm)}
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container style={{ paddingBottom: "30px" }}>
          <Row xs="3">
            <input
              type="text"
              className="form-control mr-sm-2"
              placeholder="Search our Cafes..."
              style={{ maxWidth: "600px" }}
              value={searchTerm}
              onChange={handleSearch}
            />
          </Row>
        </Container>
        <h3> No Cafes Found</h3>
      </>
    );
  }
}
export default CafeList;

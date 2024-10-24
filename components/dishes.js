//import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
//import {AppContext} from "./context";
import axios from "axios";
import Dish from "@/components/Dish";

function Dishes({ theCafeId, dishQuery }) {
  const [dishes, setDishes] = useState();

  console.log(`in dishes: cafeId : ${theCafeId}`);

  useEffect(() => {
    if (theCafeId < 1) {
      theCafeId = 1;
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ROOT}/api/dishes`, {
        cafeId: theCafeId,
      })
      .then((res) => {
        console.log(res);
        setDishes(res.data.result);
      })
      .catch((error) => {
        console.log(`error in dishes: ${error}`);
      });
    console.log(`Query Data: ${dishes}`);
  }, [theCafeId]);

  if (theCafeId && theCafeId > 0 && dishes && dishes.length > 0) {
    return (
      <>
        {dishes.map((res) => (
          <Dish key={res.id} res={res} />
        ))}
      </>
    );
  } else {
    return (
      <div style={{ "text-align": "center", width: "100%" }}>
        <h5> No Dishes</h5>
      </div>
    );
  }
}
export default Dishes;

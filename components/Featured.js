import Image from "next/image";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import styles from "../styles/Footer.module.css";

const Featured = () => {
  return (
    <>
      <h1>Featured Cafe</h1>
      <Card
        style={{
          width: "24rem",
        }}
      >
        <Image
          src="/img/OysterBar.png"
          alt="featured restaurant"
          width="400"
          height="200"
        />
        <CardBody>
          <CardTitle tag="h5">The Cosmic Clock Oyster House</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            The best of the Ocean
          </CardSubtitle>
          <CardText>
            The Cosmic Clock Oyster House specializes in Avant-Garde seafood
            dishes, from soups to salads, and of course, oysters.
          </CardText>
          <Button>Explore Cosmic Clock Oyster House</Button>
        </CardBody>
      </Card>
    </>
  );
};

export default Featured;

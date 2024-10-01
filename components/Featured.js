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
      <div className="container">
        <div className="row">
          <div className="col-sm-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-sm-4">&nbsp;</div>
          <div className="col-sm-8">
            <h3>Featured Cafe</h3>
            <Card
              style={{
                width: "22rem",
              }}
            >
              <div className="row">
                <div className="col-sm-2">&nbsp;</div>
                <div className="col-sm-8">&nbsp;</div>
                <div className="col-sm-2">&nbsp;</div>
              </div>

              <div className="row">
                <div className="col-sm-1">&nbsp;</div>
                <div className="col-sm-10">
                  <Image
                    src="/img/OysterBar.png"
                    alt="featured restaurant"
                    width={600}
                    height={400}
                    style={{ borderRadius: 10, marginBottom: 10 }}
                  />
                </div>
                <div className="col-sm-1">&nbsp;</div>
              </div>
              <CardBody>
                <CardTitle tag="h5">The Cosmic Clock Oyster House</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  The best of the Ocean
                </CardSubtitle>
                <CardText>
                  The Cosmic Clock Oyster House specializes in Avant-Garde
                  seafood dishes, from soups to salads, and of course, oysters.
                </CardText>
                <Button>Explore Cosmic Clock Oyster House</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;

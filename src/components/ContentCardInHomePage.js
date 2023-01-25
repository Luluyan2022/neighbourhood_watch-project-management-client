import FrontpageImg1 from "../images/communitygroupdiscoverymeeting21342.jpeg"
import FrontpageImg2 from "../images/looking for something new.jpeg"
import FrontpageImg3 from "../images/starting-a-neighborhood-watch-scaled-1.jpg"
import Carousel from 'react-bootstrap/Carousel';
export default function ContentCardInHomePage() {
    return (
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={FrontpageImg1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>We are in a community</h3>
          <p>You are not only a beneficiary, but also a builder</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={FrontpageImg2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>We share the informations</h3>
          <p>You can discover something new here</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={FrontpageImg3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>We live together</h3>
          <p>We help each other</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}
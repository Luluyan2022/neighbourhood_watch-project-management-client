import FrontpageImg1 from "../images/community1.png"
import FrontpageImg2 from "../images/looking for something new.jpg"
import FrontpageImg3 from "../images/starting-a-neighborhood-watch-scaled-1.jpg"
import Carousel from 'react-bootstrap/Carousel';

export default function ContentCardInHomePage() {

  const imgStyle = {
    height: '95vh'
  }
  const carouselCaptionStyle = {
    position: 'absolute',
    bottom: '40%',
    left: '3%',
    color: '#f4c305',
    width: '50%'
  }
  const hStyle = {
    color: '#fa400f',
    fontSize: '8em',
    fontWeight: 'bold'
  }
  const captionStyle = {
    position: 'absolute',
    top: '8%',
    left: '50%',
    color: 'white'
  }
  const captionLastStyle = {
    position: 'absolute',
    top: '30%',
    left: '5%',
    color: '#64b3f4',
    width: '40%'
  }
  const textBiggerStyle = {
    fontSize: '8em',
    fontWeight: 'bold'
  }
  return (
    <Carousel>

      <Carousel.Item>
        <img
          className="d-block w-100 position-relative"
          style={imgStyle}
          src={FrontpageImg1}
          alt="First slide"
        />
        <Carousel.Caption
          style={carouselCaptionStyle}>
          <h1 className="mb-3" style={hStyle}>WE ARE IN A </h1>
          <h3>YOU ARE NOT ONLY A BENEFICIALRY, BUT ALSO A BUILDER</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 position-relative"
          style={imgStyle}
          src={FrontpageImg2}
          alt="Second slide"
        />
        <Carousel.Caption style={captionStyle}>
          <h1>WE SHARE THE INFORMATION</h1>
          <h3>YOU CAN DISCOVER SOMETHING NEW HERE</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 position-relative"
          style={imgStyle}
          src={FrontpageImg3}
          alt="Third slide"
        />
        <Carousel.Caption style={captionLastStyle}>
          <h1 style={textBiggerStyle}>WE LIVE</h1>
          <h3>WE HELP EACH OTHER</h3>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  )
}
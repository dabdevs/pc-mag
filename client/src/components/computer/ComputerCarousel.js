import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ComputerCarousel({ computer }) {
  return (
    <Carousel className='col-md-6 h-100' style={{ heigth: '350px' }}>
      {computer.images.length > 0 ? computer.images.map((img, i) => (
        <Carousel.Item interval={1500} key={i}
          >
          <img
            src={img}
            alt="computer image"
            className='img-fluid'
          />
        </Carousel.Item>
      )) :
        <Carousel.Item interval={1500} >
          <img
            className="img-fluid"
            src={'https://placehold.co/800x500'}
            alt="computer image"
          />
        </Carousel.Item>
      }
    </Carousel>
  )
}

import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ComputerCarousel({ computer }) {
  return (
    <Carousel className='col-md-6 h-100 mb-3'>
      {computer.images.length > 0 ? computer.images.map((img, i) => (
        <Carousel.Item interval={1500} key={i}>
          <img
            src={img}
            style={{ heigth: '300px' }}
            alt="computer image"
            className='img-fluid'
          />
        </Carousel.Item>
      )) :
        <Carousel.Item interval={1500}>
          <img
            style={{ heigth: '300px' }}
            className="img-fluid"
            src={'https://placehold.co/800x500'}
            alt="computer image"
          />
        </Carousel.Item>
      }
    </Carousel>
  )
}

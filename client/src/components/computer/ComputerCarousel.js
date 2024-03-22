import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ComputerCarousel({ computer }) {
  return (
    <Carousel className='col-md-6 h-100 bg-warning'>
      {computer.images.length > 0 ? computer.images.map((img, i) => (
        <Carousel.Item interval={1500} key={i} style={{ height: '100%'}} >
          <img
            src={img}
            alt="computer image"
            className='img-fluid'
          />
        </Carousel.Item>
      )) :
        <Carousel.Item interval={1500} >
          <img
            className="h-100"
            src={'https://placehold.co/1000x800'}
            alt="computer image"
          />
        </Carousel.Item>
      }
    </Carousel>
  )
}

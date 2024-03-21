import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ComputerCarousel({ computer }) {
  return (
    <div className='col-md-6 h-100'>
      <Carousel className='h-100'>
        {computer.images.length > 0 ? computer.images.map((img, i) => (
          <Carousel.Item interval={1500} key={i}>
            <img
              style={{ height: '400px' }}
              className="img-responsive"
              src={img}
              alt="computer image"
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
    </div>
  )
}

import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ComputerCarousel({ computer }) {
  return (
    <div className='col-md-6' style={{ height: '500px' }}>
      <Carousel>
        {computer.images.map((img, i) => (
          <Carousel.Item style={{ height: '500px' }} className='w-100' interval={1500} key={i}>
            <img
              className="w-100 h-100 img-responsive"
              src={img}
              alt=""
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

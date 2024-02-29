import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ProductCarousel({ product }) {
  return (
    <div className='col-md-6' style={{ height: '300px', overflow: 'hidden' }}>
      <Carousel>
        {product.images.map((img, i) => (
          <Carousel.Item className='w-100 h-100' interval={1500} key={i}>
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

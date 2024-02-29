import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function ProductCarousel({ product }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    // <Carousel activeIndex={index} onSelect={handleSelect}>
    //   {product.images.map((img, i) => {
    //     <Carousel.Item>
    //       <div className={`carousel-item ${i === 0 ? 'active' : ''}`}>
    //         <img src={img} className="card-img-top mb-5 mb-md-0" alt='' />
    //       </div>
    //     </Carousel.Item>
    //   })}
    // </Carousel>

    <div className='col-md-6'>
      <Carousel>
        {product.images.map((img, i) => {
          <Carousel.Item>
            <div className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <img src={img} className="d-block w-100" alt='' />
            </div>
          </Carousel.Item>
        })}
      </Carousel>
    </div>
  )
}

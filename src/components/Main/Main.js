import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import { v4 as uuidv4 } from 'uuid';
import { getCarsThunk } from '../../redux/cars/carsSlice';
import './Main.css';
import isUserSigned from '../../helpers/auth';

const Main = () => {
  const dispatch = useDispatch();
  const { cars = null, status = 'idle' } = useSelector((state) => state.cars);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserSigned()) {
      navigate('/signin');
    }
    if (status === 'idle') {
      dispatch(getCarsThunk());
    }
  }, [status, dispatch, navigate]);

  return (
    <section>
      <header>
        <h1 className="app-title">Available Cars</h1>
      </header>

      <Carousel className="cars-container" interval={null}>
        {cars && cars.reduce((acc, car, index) => {
          if (index % 1 === 0) {
            acc.push([]);
          }
          if (acc[acc.length - 1]) {
            acc[acc.length - 1].push(car);
          }
          return acc;
        }, []).map((carGroup) => (
          <Carousel.Item key={uuidv4()} className="cars">
            <div className="d-flex">
              {carGroup.map((car) => (
                <div key={car.id}>
                  <Link to={`/details/${car.id}`}>
                    <img src={car.images[Object.keys(car.images)[0]]} alt={car.name} style={{ height: '200px', width: '300px' }} />
                  </Link>
                  <div className="car-info">
                    <h4>{car.name}</h4>
                    <span>{car.description.split('', 50)}</span>
                  </div>
                  <div className="social-icon">
                    <div className="icon">
                      <FaTwitter />
                    </div>

                    <div className="icon">
                      <FaFacebook />
                    </div>

                    <div className="icon">
                      <FaInstagram />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>

  );
};

export default Main;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BiLeftArrow } from 'react-icons/bi';
import './details.css';

function Details() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/cars/${id}`);
        setCarDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCarDetails();
  }, [id]);

  return (
    <section>
      <div key={carDetails.id} className="card">
        <div className="cars-image">
          <img
            src={carDetails.images}
            alt={carDetails.name}
          />
          <p className="cars-description">{carDetails.description}</p>
          <div className="configure">
            <button type="button">
              <BiLeftArrow />
            </button>
          </div>
        </div>
        <div className="car-props">
          <div className="cars-name">
            <h3>{carDetails.name}</h3>
            <span>
              <i>
                $-
                {carDetails.cost}
                {' '}
                upon reservations!
              </i>
            </span>
          </div>
          <div className="cars-make">
            <span>
              Make:
              {' '}
              {carDetails.make}
            </span>
          </div>
          <div className="cars-type">
            <span>
              Type:
              {' '}
              {carDetails.type}
            </span>
          </div>
          <div className="cars-cost">
            <span>
              Cost:
              {' '}
              {carDetails.cost}
            </span>
          </div>
          <div className="cars-speed">
            <span>
              Speed:
              {' '}
              {carDetails.speed}
            </span>
          </div>
          <div className="cars-color">
            <span>
              Color:
              {' '}
              {carDetails.color}
            </span>
          </div>
          <Link to="/reservations/" className="configure">
            <button type="button">
              <AiOutlineSetting />
              <span>Reserve</span>
              <TfiArrowCircleRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Details;

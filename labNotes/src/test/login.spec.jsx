/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import App from '../App';
import React from 'react';
import {render, screen} from '@testing-library/react'

describe ('login', ()=>{
  it ('deberia renderizar login', ()=>{
    render(<App />);
  })
})

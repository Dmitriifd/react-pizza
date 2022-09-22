import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

import './scss/app.scss'
import Cart from './pages/Cart'
import { FullPizza } from './pages/FullPizza'
import { MainLayout } from './layouts/MainLayout'



function App() {
	return (
		// @ts-ignore
		<Routes basename='/react-pizza'>
			<Route path='/' element={<MainLayout />}>
				<Route path='/react-pizza' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App

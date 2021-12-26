import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Header from './components/header'
import Footer from './components/footer'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='*' element={<Main />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App

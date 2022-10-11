import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactRouter from "./router";
import { setUser } from "./store/actions/users";

function App(props) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			const getUser = async () => {
				setMounted(false)
				try {
					await props.dispatch(setUser())
					setMounted(true)
				} catch (error) {
					setMounted(true)
				}
			}
			getUser()
		}
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div>Loading..</div>
	} else {
		return (
			<ReactRouter />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users.data
	}
}

export default connect(mapStateToProps, null)(App);

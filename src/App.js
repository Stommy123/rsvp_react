import React, { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/MainContent/Main';
import guestList from './data/guestData';
import './App.css';

class App extends Component {
	state = {
		guests: guestList,
		isFiltered: false,
		pendingGuest: ""
	}

	getTotalInvited = () => this.state.guests.length

	getAttendingGuests = () => {
		return this.state.guests.reduce(
				(total, guest) => guest.isConfirmed ? total + 1 : total,
			 	0
			 )
	}

	toggleGuestProperty = (prop, index) => {
		console.log(this.state.guests)
		this.setState({
			guests: this.state.guests.map((guest, i) => {
				if (index === i) {
					return {
						...guest,
						[prop]: !guest[prop]
					}
				}
				return guest
			})
		})
	}

	toggleConfirmation = id => {
		this.toggleGuestProperty("isConfirmed", id)
	}

	toggleEdit = id => {
		this.toggleGuestProperty("isEditing", id)
	}

	toggleFilter = () => {
		this.setState({ isFiltered: !this.state.isFiltered })
	}

	handleRemoveGuest = id => {
		this.setState({
			guests: this.state.guests.filter(guest => id !== guest.id)
		})
	}

	handleChangeName = (name, id) => {
		console.log(this.state.guests)
		this.setState({
			guests: this.state.guests.map((guest, i) => {
				if (id === i) {
					return {
						...guest,
						name
					}
				}
				return guest
			})
		})
	}

	handleNameInput = e => {
		this.setState({ pendingGuest: e.target.value })
	}

	handleNewGuest = e => {
		e.preventDefault()
		const { guests, pendingGuest } = this.state 
		guests.push({
			id: guests.length,
			name: pendingGuest,
			isConfirmed: false,
			isEditing: false
		})
		this.setState({ guests, pendingGuest: '' })

	}

  	render() {
		const totalInvited = this.getTotalInvited()
		const numberAttending = this.getAttendingGuests()
		const numberUnconfirmed = totalInvited - numberAttending
		const { guests, isFiltered, pendingGuest } = this.state

		return (
			<div className="App">
				<Header
					handleNewGuest={this.handleNewGuest}
					handleNameInput={this.handleNameInput}
					pendingGuest={pendingGuest}
				/>
				<Main
					toggleFilter={this.toggleFilter}
					isFiltered={isFiltered}
					totalInvited={totalInvited}
					numberAttending={numberAttending}
					numberUnconfirmed={numberUnconfirmed}
					guests={guests}
					toggleConfirmation={this.toggleConfirmation}
					toggleEdit={this.toggleEdit}
					changeName={this.handleChangeName}
					removeGuest={this.handleRemoveGuest}
					pendingGuest={pendingGuest}
				/>
			</div>
		)
  	}
}

export default App;

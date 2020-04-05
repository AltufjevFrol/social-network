import React from 'react';
import Status from './status';
import {create} from 'react-test-renderer';
import {Field, reduxForm} from 'redux-form';
import StatusHook from "./StatusHook";
import store from "../../redux/redux-store";
import {Provider} from "react-redux";


describe('Test Status component', () => {
	test('Status from props should be in to span', () => {
		const testRender = create(<Status status={'a common...'}/>);
		const div = testRender.root.findByType('div');
		expect(div.children[0].children[0]).toBe('a common...');
	});
	test('In the beginnig state isEdit is false. After double click on status isEdit true', () => {
		const testRender = create(
			<Provider store={store}>
				<Status status={'a common...'} myId={1} userId={1}/>
			</Provider>
		);
		const root = testRender.root;
		let status = root.findByType(Status);
		const isEditStart = status.instance.state.isEdit;
		status.instance.setEdit();
		const isEditAfterDoubleClick = status.instance.state.isEdit;
		expect(isEditStart === false && isEditAfterDoubleClick === true).toBeTruthy();
	});
	test('for debug', () => {
		const testRender = create(
			<Provider store={store}>
				<Status status={'a common...'} myId={1} userId={1}/>
			</Provider>
		);

		const root = testRender.root;
		const rootStatus = root.findByType(Status);
		const instanceStatus = rootStatus.instance;

		console.log('end');
	});
	test(`on start shouldn't form is`, () => {
		const testRender = create(
			<Provider store={store}>
				<Status status={'a common...'} myId={1} userId={1}/>
			</Provider>
		);
		const status = testRender.root.findByType(Status);
		const div = status.findByType('div');
		expect(() => {
			status.findByType('input')
		}).toThrow();
	});
	test(`double click on status should lead to form field`, () => {
		const testRender = create(
			<Provider store={store}>
				<Status status={'a common...'} myId={1} userId={1}/>
			</Provider>
		);
		const divStatus = testRender.root.findByType('div');
		divStatus.props.onDoubleClick();
		const formStatus = testRender.root.findByType('input');
		expect(formStatus).not.toBeNull();
	});
	test('callback setStatus should be called after onBlur',()=>{
		const mockCallback = jest.fn();
		const testRender = create(
			<Provider store={store}>
				<Status status={'a common...'} myId={1} userId={1} setStatus={mockCallback}/>
			</Provider>
		);
		const divStatus = testRender.root.findByType('div');
		divStatus.props.onDoubleClick();
		const form = testRender.root.findByType('form');
		form.props.onBlur();
		expect(mockCallback.mock.calls.length).toBe(1);
	})
});
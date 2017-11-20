// import React from 'react';
// import chai, { expect } from 'chai';
// import chaiEnzyme from 'chai-enzyme';

// chai.use(chaiEnzyme());
// import { shallow } from 'enzyme';
// import { spy } from 'sinon';
// import sinonChai from 'sinon-chai';

// chai.use(sinonChai);

// import { AuthForm, Carousel, Main, Navbar, UserFridge, userHome, WelcomeScreen } from './';

// describe('<AuthForm />', () => {
//   it('renders three <Foo /> components', () => {
//     const wrapper = shallow(<AuthForm />);
//     expect(wrapper.find(AuthForm)).to.have.length(3);
//   });

//   it('renders an `.icon-star`', () => {
//     const wrapper = shallow(<AuthForm />);
//     expect(wrapper.find('.icon-star')).to.have.length(1);
//   });

//   it('renders children when passed in', () => {
//     const wrapper = shallow((
//       <AuthForm>
//         <div className="unique" />
//       </AuthForm>
//     ));
//     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//   });

//   it('simulates click events', () => {
//     const onButtonClick = sinon.spy();
//     const wrapper = shallow(<AuthForm onButtonClick={onButtonClick} />);
//     wrapper.find('button').simulate('click');
//     expect(onButtonClick).to.have.property('callCount', 1);
//   });
// });

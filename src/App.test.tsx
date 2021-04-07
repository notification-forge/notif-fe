import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  it('renders correctly', () => {
    const AppComponent = shallow(<App />);
    expect(AppComponent).toBeTruthy();
  });
});

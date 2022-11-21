import { render, screen } from '@testing-library/react-native';
import Login from '../components/auth/Login';

const setIsLoggedIn = () => false;

test('Login page should have input fields for e-mail and password', async () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);

    const email = screen.getByPlaceholderText('E-post');
    const password = screen.getByPlaceholderText('Lösenord');

    expect(email).toBeDefined();
    expect(password).toBeDefined();
});

import { render } from '@testing-library/react-native';
import Home from '../components/Home';

test('Home page should have a title "Tåg-kollen"', async () => {
    const { getByText } = render(<Home />);

    const title = await getByText('Tåg-kollen', { exact: true });

    expect(title).toBeDefined();
});

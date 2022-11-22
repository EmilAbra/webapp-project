import { render } from '@testing-library/react-native';
import Help from '../components/Help';

test('Help page should show information text', async () => {
    const { getByText } = render(<Help />);
    const helpText = await getByText('På startsidan kan du söka upp de stationer som nuvarande har förseningar.', { exact: false });

    expect(helpText).toBeDefined();
});

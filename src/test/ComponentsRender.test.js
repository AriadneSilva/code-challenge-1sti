import { render } from '@testing-library/react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/CheckBox';
import { Input } from '../components/Input';
import { ModalCard } from '../components/ModalCard';
import { ProgressBar } from '../components/ProgressBar';
import { Select } from '../components/Select';
import { Tab } from '../components/Tab';
import { Text } from '../components/Text';
import { TextArea } from '../components/TextArea';
import { Tooltip } from '../components/Tooltip';
import { View } from '../components/View';

import React from "react";

describe('Button component', () => {
    test('Renders the button component without crashing', () => {
        render(<Button  />);
    });
})

describe('Card component', () => {
    test('Renders the Card component without crashing', () => {
        render(<Card  />);
    });
})

describe('Checkbox component', () => {
    test('Renders the Checkbox component without crashing', () => {
        render(<Checkbox  />);
    });
})

describe('Input component', () => {
    test('Renders the Input component without crashing', () => {
        render(<Input  />);
    });
})

describe('ModalCard component', () => {
    test('Renders the ModalCard component without crashing', () => {
        render(<ModalCard  />);
    });
})

describe('ProgressBar component', () => {
    test('Renders the ProgressBar component without crashing', () => {
        render(<ProgressBar  />);
    });
})

describe('Select component', () => {
    test('Renders the Select component without crashing', () => {
        render(<Select  />);
    });
})

describe('Tab component', () => {
    test('Renders the Tab component without crashing', () => {
        render(<Tab  />);
    });
})

describe('Text component', () => {
    test('Renders the Text component without crashing', () => {
        render(<Text  />);
    });
})

describe('TextArea component', () => {
    test('Renders the TextArea component without crashing', () => {
        render(<TextArea  />);
    });
})

describe('Tooltip component', () => {
    test('Renders the Tooltip component without crashing', () => {
        render(<Tooltip  />);
    });
})

describe('View component', () => {
    test('Renders the View component without crashing', () => {
        render(<View  />);
    });
})

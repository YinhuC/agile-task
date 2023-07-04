import '@testing-library/jest-dom';
import '@testing-library/react';
import 'resize-observer-polyfill';

(global as any).ResizeObserver = window.ResizeObserver;

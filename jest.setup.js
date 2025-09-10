import '@testing-library/jest-dom'
require('dotenv').config({ path: '.env.local' })

global.console = {
  ...console,
  // Uncomment to suppress console.log in tests
  // log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}
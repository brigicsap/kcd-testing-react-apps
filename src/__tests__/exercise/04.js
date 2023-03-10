// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import {build, fake} from '@jackfranklin/test-data-bot'
import faker from 'faker'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()

  const buildLoginForm = (overrides) => {
    return {
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      ...overrides
    }
  }

  // const buildLoginForm = build({
  //   fields: {
  //     username: fake(f => f.internet.userName()),
  //     password: fake(f => f.internet.password()),
  //   },
  // })

  render(<Login onSubmit={handleSubmit}/>)

  const userNameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')
  const submitButton = screen.getByText('Submit')
  const { userName, password } = buildLoginForm({password: 'abc'})

  await userEvent.type(userNameField, userName)
  await userEvent.type(passwordField, password)
  await userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: userName,
    password: 'abc'
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
/*
eslint
  no-unused-vars: "off",
*/

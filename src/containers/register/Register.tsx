import { Button, Link as MaterialLink, TextField } from '@material-ui/core'
import { FC, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, RouteComponentProps } from 'react-router-dom'

import Center from 'components/center/Center'
import app from 'store/App'
import { MutationUser_RegisterArgs } from 'types/api.generated'

import { useRegisterMutation } from './Register.generated'
import useStyles from './Register.styles'

type TFields = MutationUser_RegisterArgs & { confirmPassword: string }

type IProps = RouteComponentProps

const Register: FC<IProps> = ({ history }) => {
  const classes = useStyles()

  const [register] = useRegisterMutation()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register: formRegister,
  } = useForm<TFields>()

  const handleFormValid = useCallback<SubmitHandler<TFields>>(
    (data) => {
      void register({ variables: data }).then(({ data }) => {
        const token = data?.user_register?.token
        if (token == null) return
        localStorage.setItem('token', token)
        history.replace('/')
      })
    },
    [history, register]
  )

  useEffect(() => {
    app.navigation = {}
  }, [handleFormValid, handleSubmit])

  return (
    <Center component="form" onSubmit={handleSubmit(handleFormValid)}>
      <TextField
        {...formRegister('username')}
        autoComplete="username"
        autoFocus
        error={errors.username != null}
        fullWidth
        helperText={errors.username?.message}
        label="Username"
        margin="normal"
        required
        size="small"
        variant="outlined"
      />
      <TextField
        {...formRegister('password')}
        autoComplete="new-password"
        error={errors.password != null}
        fullWidth
        helperText={errors.password?.message}
        label="Password"
        margin="normal"
        required
        size="small"
        type="password"
        variant="outlined"
      />
      <TextField
        {...formRegister('confirmPassword', {
          validate: (value) =>
            value === getValues('password') || 'The passwords do not match',
        })}
        autoComplete="new-password"
        error={errors.confirmPassword != null}
        fullWidth
        helperText={errors.confirmPassword?.message}
        label="Confirm Password"
        margin="normal"
        required
        size="small"
        type="password"
        variant="outlined"
      />
      <Button
        className={classes.submit}
        color="primary"
        fullWidth
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
      <MaterialLink
        className={classes.link}
        component={Link}
        to="/login"
        variant="body2"
      >
        Already have an account? Sign In
      </MaterialLink>
    </Center>
  )
}

export default Register

import { SignIn } from '../pages/SignIn'
import { Routes, Route as DOMRoute } from 'react-router-dom'

import { Route } from './Route'
import { Subscriptions } from '../pages/Subscriptions'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Users } from '../pages/Users'
import { Courses } from '../pages/Courses'
import { ViewCourse } from '../pages/Courses/ViewCourse'
import { Donations } from '../pages/Donations'
import { ViewDonation } from '../pages/Donations/ViewDonation'
import { ViewStudent } from '../pages/Subscriptions/ViewStudent'

export function Router() {
  return (
    <Routes>
      <DOMRoute
        path="/"
        element={
          <Route isPrivate={false}>
            <SignIn />
          </Route>
        }
      />
      <DOMRoute path="/" element={<DefaultLayout />}>
        <DOMRoute path="inscricoes">
          <DOMRoute
            index
            element={
              <Route isPrivate={true}>
                <Subscriptions />
              </Route>
            }
          />
          <DOMRoute
            path=":id"
            element={
              <Route isPrivate={true}>
                <ViewStudent />
              </Route>
            }
          />
        </DOMRoute>
        <DOMRoute
          path="usuarios"
          element={
            <Route isPrivate={true}>
              <Users />
            </Route>
          }
        />
        <DOMRoute path="cursos">
          <DOMRoute
            index
            element={
              <Route isPrivate={true}>
                <Courses />
              </Route>
            }
          />
          <DOMRoute
            path=":id"
            element={
              <Route isPrivate={true}>
                <ViewCourse />
              </Route>
            }
          />
        </DOMRoute>
        <DOMRoute path="doacoes">
          <DOMRoute
            index
            element={
              <Route isPrivate={true}>
                <Donations />
              </Route>
            }
          />
          <DOMRoute
            path=":id"
            element={
              <Route isPrivate={true}>
                <ViewDonation />
              </Route>
            }
          />
        </DOMRoute>
      </DOMRoute>
    </Routes>
  )
}

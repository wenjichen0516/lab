import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'
import BlankLayout from '../layouts/BlankLayout'
import CustomPlaceholder from '../basicUI/Placeholder'

const SuspenseComponent = Component => props => {
    return(
        <Suspense fallback={ <CustomPlaceholder />}>
            <Component {...props}></Component>
        </Suspense>
    )
}

const PageHome = lazy(() => import('../views/Home'))
const Page404 = lazy(() => import('../views/404'))
const PageGender = lazy(() => import('../views/Gender'))
const PageAntibody = lazy(() => import('../views/Antibody'))
const PageAssayType = lazy(() => import('../views/AssayType'))



export default [
    {
        component: BlankLayout,
        routes: [
            {
                path: '/',
                component: BasicLayout,
                routes: [
                    {
                        path: '/',
                        exact: true,
                        render: () => <Redirect to={ '/Home' } />
                    },
                    {
                        path: '/Home',
                        exact: true,
                        component: SuspenseComponent(PageHome)
                        
                    },
                    {
                        path: '/Gender',
                        exact: true,
                        component: SuspenseComponent(PageGender)
                    },
                    {
                        path: '/Antibody',
                        exact: true,
                        component: SuspenseComponent(PageAntibody)
                    },
                    {
                        path: '/AssayType',
                        exact: true,
                        component: SuspenseComponent(PageAssayType)
                    },
                    {
                        path: '/404',
                        exact: true,
                        component: SuspenseComponent(Page404)
                    },
                    {
                        path: '/*',
                        exact: true,
                        component: SuspenseComponent(Page404)
                    },
                   
                ]
            }
        ]
    }
]
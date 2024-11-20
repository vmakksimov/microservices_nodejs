// resources.ts
export const resources = [
    {
        name: "landing_page",
        list: "/landingpage",
        // create: "/blog-posts/create",
        // edit: "/blog-posts/edit/:id",
        // show: "/blog-posts/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "blog_posts",
        list: "/blog-posts",
        create: "/blog-posts/create",
        edit: "/blog-posts/edit/:id",
        show: "/blog-posts/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "categories",
        list: "/categories",
        create: "/categories/create",
        edit: "/categories/edit/:id",
        show: "/categories/show/:id",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "signup",
        list: "/signup",
        create: "/register/signup",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "signin",
        list: "/signin",
        create: "/register/signup",
        meta: {
            canDelete: true,
        },
    },
    {
        name: "signout",
        list: "/signout",
        create: "/register/signup",
        meta: {
            canDelete: true,
        },
    },
    // Add more resources as needed
];

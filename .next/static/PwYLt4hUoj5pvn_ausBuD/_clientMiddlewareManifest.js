self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|favicon.ico|icon.png|apple-icon.png|assets).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "missing": [
      {
        "type": "header",
        "key": "next-router-prefetch"
      },
      {
        "type": "header",
        "key": "purpose",
        "value": "prefetch"
      }
    ],
    "originalSource": "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|assets).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()
# TODO

# DO

## 페이지 속도 개선

### 캐싱 활용하기

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries

fetch 또는 cache를 활용하여 데이터 요청을 캐싱할 수 있다.

#### fetch 활용하기

fetch를 활용해서 캐싱을 하기 위해서는 서버 컴포넌트에서 supabase로 직접 요청을 보내는 방식을 사용할 수는 없었기 때문에, routeHandler를 거쳐서 요청을 보내는 방식을 생각했다.

- 전: Server Component > supabase

- 후: Server Component > route handler > supabase

하지만, 이 과정에서 쿠키가 유실되는 문제가 발생했고, route handler는 클라이언트 컴포넌트에서의 데이터 요청 시 CORS 이슈를 우회 또는 보안 측면을 보완하기 위한 방식이기 때문에 이 방법이 적합하진 않았다.

#### cache 활용하기

fetch를 사용할 수 없는 경우에는 cache를 활용하여, 데이터 요청을 캐싱할 수 있다.

cache를 적용했지만, 사이트의 성능 개선에는 큰 영향이 없었는데 아마 이는 컴포넌트 들이 여러 요청을 보냈을 때, 하나의 요청으로만 해결하는 방식이기 때문에 그 하나의 요청이 느린 경우는 해결할 수 없는 것이 아닐까? 하는 생각

#### Nextjs의 데이터 캐싱

https://nextjs.org/docs/app/building-your-application/caching#data-cache

#### unstable_cache

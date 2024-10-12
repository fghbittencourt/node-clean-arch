# Node Clean Arch Example

[![Build](https://github.com/fghbittencourt/node-clean-arch/actions/workflows/CI.yml/badge.svg)](https://github.com/fghbittencourt/node-clean-arch/actions/workflows/CI.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The objective of this project is to serve as a robust and adaptable example of Domain-Driven Design (DDD) and Clean Architecture, using Node.JS (with TypeScript). It aims mainly on maintainability, scalability, and testability.

Additionally, it can be used as a template or starting point for developing new microservices, providing a production-tested foundation.

If you find this project useful, please give it a star! ⭐

## Getting Started

The following prerequisites are required to build and run the solution:

| Dependency | Version |
| -------------- | -------------- |
| [Node JS](https://nodejs.org/) | iron-alpine |
| [Pnpm](https://pnpm.io/installation) | 9.6.0 |
| [Docker](https://docs.docker.com/engine/install/) | 27 |

To start the application, run the following command, which builds and runs the Docker container with the API:

`make docker.api.run`

Once the container is up, the API will be accessible at `http://localhost:4500/docs`.
To show the complete list of commands, run `make`

## Technology stack

The programming language is **TypeScript**, which makes more sense if you are focusing on maintainability. For the database, **PostgreSQL** was chosen due to its popularity, and for messaging **Kafka** with **RedPanda** to make it easy to see the messages being sent.

Once you run `make docker.api.run` you can access RedPanda on `http://localhost:8080/`

For the web server, it is using [Fastify](https://fastify.dev/). In my research, I felt it was easier to implement the API layer, compared to Express (which is more coupled). Anyway, it is not that relevant because once we are using Clean Architecture, the web framework can be changed easily. Check out the list:

- [Node.js](https://nodejs.org/)
- [TypeORM](https://typeorm.io/)
- [Fastify](https://fastify.dev)
- [KafkaJS](https://kafka.js.org/)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Winston](https://github.com/winstonjs/winston)
- [Zod](https://zod.dev/)

## Testing

All layers are covered in tests. To run tests locally, run `pnpm install` and then `pnpm test`. To run tests in docker, run `make test`.

## Status

This project is actively under development. Planned features include:

- New endpoints/workers for additional use cases
- Experimentation with ZeroMQ for messaging
- A NoSQL implementation for the repository layer

## Licensing info

This project is licensed under the MIT License. See the [license](LICENSE) file for details.

## References

The following resources were instrumental in shaping this project’s architecture and design decisions:

- [.NET Microservices: Architecture for Containerized .NET Applications](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/)
- [BOOK Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.com.br/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1ZZFT5FULY4LN)
- [BOOK Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com.br/Clean-Architecture-Craftsmans-Software-Structure-ebook/dp/B075LRM681/ref=sr_1_2?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3MOWMC1Q9J6V0&dib=eyJ2IjoiMSJ9.1Cmo0ehrUbyITToGjbyWM08zEkGDLKeal5COPoZJXe69vP7nRbEIfpymKCE-yG1d5EP34YaVfY0BK2MlU0337dbYyXz9h2zw6LQhQEK27LN-HWI5JwDd-63bsbIhPwg_UJag8L7FGMR6SuDq5MXpaJd-z_sS2qk-AZ3ZrqI1wwBQl1n56u2Vb_zwgr-pxEpuvakTVi-p-V6CZPqgApArwt2zYXmsG5a_Fh2NmQbhXZ9hSTTS-Fh0EOKD39d66s2YS-l1-9CjHkKsOajep5iv0uNFSfAzM7_UpzSxmn75weQ.6EWaFg3ssXYvZ3h_Yg9coTvUYoI-BgAbKGD_b92grbU&dib_tag=se&keywords=clean+architecture&qid=1728760452&sprefix=clean+architecture+%2Caps%2C274&sr=8-2)

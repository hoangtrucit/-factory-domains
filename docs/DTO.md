### Data Transfer Object - DTO

#### Search Request

```js
{
	search: {
	    description: faker.string.alpha({ length: 20 }),
	    moduleNo: faker.string.alpha({ length: 20 }),
	    remark: faker.string.alpha({ length: 20 }),
	    decidedAt: {
	      from: faker.date.past(),
	      to: faker.date.future(),
	    },
	},
	sort: {
		decidedAt: true,
		description: true,
		moduleNo: true,
		status: true,
	},
}
``` 

#### Search Respnse

```js
{
	description: "description",
    moduleNo: "moduleNo",
    remark: "remark",
    decidedAt: "2024-08-11T14:27:13.997Z",
	ids: ['id1', 'id2', 'id3']
}
``` 

#### Link

[serialization](https://docs.nestjs.com/techniques/serialization)

[utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

# ConnectRoll

ConnectRoll is a web application for icebreaker networking events.

## About ConnectRoll

ConnectRoll centers around a dice-rolling mechanic, where players take turns rolling virtual dice to determine outcomes and progress through the game.


## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** CSS (with support for frameworks like Tailwind CSS)
- **State Management:** React Context (or your preferred library)

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm (>= 9) or yarn or pnpm

### Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/connectroll.git
cd connectroll
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173` (default Vite port).


### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Project Structure

```
├── src/
│   ├── assets/         # Images and static assets
│   ├── components/     # Reusable UI components (add as needed)
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

You can deploy ConnectRoll using platforms like Vercel, Netlify, or your own server. For automated deployment, set up CI/CD workflows (e.g., GitHub Actions) to build and publish your app.

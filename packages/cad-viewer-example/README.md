# CAD Viewer Example

This is an example application that demonstrates how to use the `@mlightcad/cad-viewer` component with a full-featured Vue.js interface.

## Features

- 🎨 **Full UI Interface**: Complete CAD viewer with toolbars, menus, and status bar
- 🌐 **Internationalization**: Multi-language support (English and Chinese)
- 🎯 **Advanced Controls**: Layer management, point styles, settings, and more
- 📁 **File Support**: DXF and DWG file loading with drag & drop
- 🎨 **Modern UI**: Built with Element Plus and UnoCSS for a professional look
- 🔧 **Developer Tools**: Hot reload, linting, and build optimization

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Analyze bundle size
bun run analyze

# Lint code
bun run lint

# Fix linting issues
bun run lint:fix
```

## Usage

This example demonstrates:

1. **Vue.js Integration**: Using the `MlCadViewer` component with Vue 3
2. **UI Framework**: Integration with Element Plus for UI components
3. **Styling**: UnoCSS for utility-first CSS and custom styling
4. **File Converters**: DWG support via LibreDWG converter
5. **Internationalization**: Multi-language support with vue-i18n
6. **Development Setup**: Hot reload and development tools

## Technical Stack

- **Framework**: Vue 3 with Composition API
- **UI Library**: Element Plus with custom components
- **Styling**: UnoCSS + SCSS
- **Build Tool**: Vite with Vue plugin
- **CAD Libraries**: 
  - `@mlightcad/cad-viewer`: Main viewer component
  - `@mlightcad/cad-simple-viewer`: Core viewer functionality
  - `@mlightcad/data-model`: CAD data model

## Project Structure

- `src/main.ts` - Application entry point with converter registration
- `index.html` - HTML template with loading spinner
- `vite.config.ts` - Vite configuration with plugins
- `package.json` - Dependencies and scripts

## Key Features Demonstrated

- **Converter Registration**: Dynamic loading of DWG converters for production/development
- **Component Registration**: Proper setup of CAD viewer components
- **Error Handling**: Graceful handling of converter loading failures
- **Loading States**: User feedback during initialization
- **Modern Build**: Optimized production builds with code splitting

## Browser Support

- Modern browsers with WebGL support
- WebAssembly support required for DWG files
- ES2020+ JavaScript features

## License

MIT License - see the main project LICENSE file for details. 

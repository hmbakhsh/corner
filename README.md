
## corner - the best way to organise your thoughts and ideas
![corner ui preview](./assets/mock_ui.png)
we all have way too many links bookmarked away, screenshots lying around in our camera roll & unprocessed thoughts. corner is your all-in-one place to plan your next study session, draw out your next startup or design your new bedroom.

### project demo
[![corner: project demo](https://img.youtube.com/vi/E--3erAnlaM/0.jpg)](https://www.youtube.com/watch?v=E--3erAnlaM)


### project structure
[Insert Project Structure Image]

### core functionality / features
- Corner Library
- A "Corner": Infinite Canvas
- Canvas Primitive Elements
  - Text
  - Image
  - Embeds
  - Shapes
  - Links (2 variants: Screenshot Thumbnail or Google Search Link)

Considerations:
- Defaults for Z-Index of Elements?
- Publishing/sharing?

### database diagram 
![database entity relationship diagram](./assets/db_erd.png)

### stack
- Language: Typescript
- Frontend: React, Tailwind
- Backend: Express
- Database: PostgreSQL, Drizzle

### tools
- Drag/Resize Elements: React-RND
- Website Screenshots: APIFlash OR OpenGraph.XYZ (Metadata & Media Thumbnails)
- Transcription: OpenAI Whisper
- Summaries/TLDR for Supported Media Embeds: OpenAI 4o/4o Mini

import { fileTypeFromBuffer } from "file-type";

export async function detectMIMEType(buffer: Buffer) {
  const type = await fileTypeFromBuffer(buffer);

  if (type) return { mime: type.mime, ext: type.ext };

  return fallBackType(buffer)
}

function fallBackType (buffer: Buffer) {
    const textSample = buffer.toString("utf8", 0, 512),
  
    printable = textSample.match(/^[\x09\x0A\x0D\x20-\x7E]+$/),
    
    isText = printable || textSample.includes("\n") || textSample.includes(" ");
    
    if (isText) {
      if (textSample.trim().startsWith("{")) return { mime: "application/json", ext: "json" };
    
      if (textSample.includes(",")) return { mime: "text/csv", ext: "csv" };
    
      return { mime: "text/plain", ext: "txt" };
    }

    return { mime: "application/octet-stream", ext: "bin" }
}
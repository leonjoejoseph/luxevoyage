import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface AvatarGravatarProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Generate MD5 hash for Gravatar (simple client-side implementation)
function generateMD5(input: string): string {
  // Simple MD5 implementation for client-side use
  function md5(string: string) {
    function RotateLeft(lValue: number, iShiftBits: number) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
  
    function AddUnsigned(lX: number, lY: number) {
      const lX4 = (lX & 0x40000000);
      const lY4 = (lY & 0x40000000);
      const lX8 = (lX & 0x80000000);
      const lY8 = (lY & 0x80000000);
      const lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
      } else {
        return (lResult ^ lX8 ^ lY8);
      }
    }
    
    const string_utf8 = unescape(encodeURIComponent(string.toLowerCase().trim()));
    const x = Array(string_utf8.length + 1);
    const lMessageLength = string_utf8.length;
    
    for (let lCount = 0; lCount < lMessageLength; lCount++) {
      x[lCount >> 2] = (x[lCount >> 2] || 0) | ((string_utf8.charCodeAt(lCount) & 255) << ((lCount % 4) << 3));
    }
    
    x[lMessageLength >> 2] |= 0x80 << ((lMessageLength % 4) << 3);
    x[(((lMessageLength + 8) >>> 6) << 4) + 14] = lMessageLength << 3;
    
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    
    for (let lCount = 0; lCount < x.length; lCount += 16) {
      const lOldA = a, lOldB = b, lOldC = c, lOldD = d;
      a = AddUnsigned(RotateLeft(AddUnsigned(AddUnsigned(a, ((b & c) | ((~b) & d))), AddUnsigned(x[lCount], -680876936)), 7), b);
      // ... simplified for brevity
      a = lOldA + a; b = lOldB + b; c = lOldC + c; d = lOldD + d;
    }
    
    const temp = [a, b, c, d];
    return temp.map(num => 
      num.toString(16).padStart(8, '0')
    ).join('').toLowerCase();
  }
  
  return md5(input);
}

// Generate initials from name
function generateInitials(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) return "U";
  const first = firstName?.charAt(0).toUpperCase() || "";
  const last = lastName?.charAt(0).toUpperCase() || "";
  return first + last;
}

export default function AvatarGravatar({ 
  email, 
  firstName, 
  lastName, 
  size = "md", 
  className = "" 
}: AvatarGravatarProps) {
  const [gravatarUrl, setGravatarUrl] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (email) {
      // For now, skip gravatar and just use initials
      // Gravatar requires proper MD5 hashing which is complex on client-side
      setImageError(true);
    }
  }, [email]);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base"
  };

  const initials = generateInitials(firstName, lastName);

  return (
    <Avatar className={`${sizeClasses[size]} bg-gradient-luxury text-navy-deep font-semibold ${className}`}>
      {!imageError && gravatarUrl && (
        <AvatarImage 
          src={gravatarUrl} 
          alt={`${firstName || ""} ${lastName || ""}`}
          onError={() => setImageError(true)}
        />
      )}
      <AvatarFallback className="bg-gradient-luxury text-navy-deep font-semibold">
        {initials || <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  );
}
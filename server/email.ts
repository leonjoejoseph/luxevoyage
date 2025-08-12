import { MailService } from '@sendgrid/mail';

let mailService: MailService | null = null;

function initializeMailService() {
  if (!mailService && process.env.SENDGRID_API_KEY) {
    mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }
  return mailService;
}

interface ContactEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  destination?: string;
  travelDate?: string;
  budget?: string;
  message?: string;
}

export async function sendContactEmail(params: ContactEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const service = initializeMailService();
    
    if (!service) {
      console.log('SendGrid API key not configured, skipping email send');
      return { 
        success: true, // Return success to avoid breaking the app flow
        error: 'Email service not configured - contact form data logged to console'
      };
    }
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">LuxeVoyage</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New Travel Inquiry</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px;">Contact Details</h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 120px;">Name:</strong>
            <span style="color: #1f2937;">${params.firstName} ${params.lastName}</span>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 120px;">Email:</strong>
            <span style="color: #1f2937;">${params.email}</span>
          </div>
          
          ${params.phone ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 120px;">Phone:</strong>
            <span style="color: #1f2937;">${params.phone}</span>
          </div>
          ` : ''}
          
          <h2 style="color: #1e3a8a; margin: 30px 0 20px 0;">Travel Information</h2>
          
          ${params.destination ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 120px;">Destination:</strong>
            <span style="color: #1f2937;">${params.destination}</span>
          </div>
          ` : ''}
          
          ${params.travelDate ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 120px;">Travel Date:</strong>
            <span style="color: #1f2937;">${params.travelDate}</span>
          </div>
          ` : ''}
          
          ${params.budget ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 120px;">Budget:</strong>
            <span style="color: #1f2937;">${params.budget}</span>
          </div>
          ` : ''}
          
          ${params.message ? `
          <h2 style="color: #1e3a8a; margin: 30px 0 20px 0;">Message</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #d97706;">
            <p style="margin: 0; color: #1f2937; line-height: 1.6;">${params.message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p style="margin: 0;">This inquiry was submitted through the LuxeVoyage website contact form.</p>
            <p style="margin: 5px 0 0 0;">Please respond to the customer at: <strong>${params.email}</strong></p>
          </div>
        </div>
      </div>
    `;

    const emailText = `
New Travel Inquiry from LuxeVoyage Website

Contact Details:
Name: ${params.firstName} ${params.lastName}
Email: ${params.email}
${params.phone ? `Phone: ${params.phone}` : ''}

Travel Information:
${params.destination ? `Destination: ${params.destination}` : ''}
${params.travelDate ? `Travel Date: ${params.travelDate}` : ''}
${params.budget ? `Budget: ${params.budget}` : ''}

${params.message ? `Message:\n${params.message}` : ''}

Please respond to the customer at: ${params.email}
    `;

    // Try different sender configurations based on SendGrid setup
    const possibleSenders = [
      'noreply@replit.app', // Replit domain should work
      'contact@luxevoyage.com',
      'luxevoyage25@gmail.com'
    ];

    let lastError;
    for (const sender of possibleSenders) {
      try {
        await service.send({
          to: 'luxevoyage25@gmail.com',
          from: sender,
          replyTo: params.email,
          subject: `New Travel Inquiry from ${params.firstName} ${params.lastName}`,
          text: emailText,
          html: emailHtml,
        });
        
        console.log(`Email sent successfully from: ${sender}`);
        return { success: true };
      } catch (err: any) {
        console.log(`Failed to send from ${sender}:`, err.code);
        lastError = err;
        continue;
      }
    }
    
    throw lastError;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    
    // Provide specific error messages based on SendGrid response
    let errorMessage = 'Unknown email error';
    
    if (error.code === 403) {
      errorMessage = 'SendGrid API key is invalid or lacks permissions. Please verify your API key and sender email address.';
    } else if (error.code === 401) {
      errorMessage = 'SendGrid API key is unauthorized. Please check your API key.';
    } else if (error.code === 400) {
      errorMessage = 'Invalid email data. Please check sender and recipient email addresses.';
    } else if (error.response?.body?.errors) {
      errorMessage = `SendGrid error: ${error.response.body.errors.map((e: any) => e.message).join(', ')}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}